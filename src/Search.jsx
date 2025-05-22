import { StatefulTable, Tag, Link } from "carbon-addons-iot-react";
import { MenuItem, MenuButton } from "@carbon/react";
import Papa from "papaparse";
import { useMemo, useEffect, useState } from "react";

import "carbon-addons-iot-react/css/carbon-addons-iot-react.css";
import {
  MANUFACTURER,
  PROTOCOLS_TAG_COLOR,
  SLACK_CONTACT_LINK,
  VERSIONS,
} from "./constants/globalContants";
import ManufacturerCell from "./components/ManufacturerCell";

const renderProtocolTags = ({ value }) => {
  if (value) {
    const outputArray = [...new Set(value.split(" | "))];

    return (
      <div>
        {outputArray.map((element) => (
          <Tag key={element} type={PROTOCOLS_TAG_COLOR[element]} size="sm">
            {element}
          </Tag>
        ))}
      </div>
    );
  }

  return null;
};

const columns = [
  {
    id: "manufacturer",
    name: "Manufacturer",
    isSortable: true,
    filter: {
      placeholderText: "Enter a value",
    },
    width: "140px",
    renderDataFunction: ({ rowId, value }) => {
      const logo = MANUFACTURER.find((item) => item.name === value)?.logo;
      return <ManufacturerCell key={rowId} logo={logo} name={value} />;
    },
  },
  {
    id: "product_series",
    name: "Product series",
    isSortable: true,
    filter: {
      placeholderText: "Enter a value",
    },
    width: "140px",
  },
  {
    id: "product_name",
    name: "Product name",
    isSortable: true,
    filter: {
      placeholderText: "Enter a value",
    },
    width: "400px",
  },
  {
    id: "product_type",
    name: "Product type",
    isSortable: true,
    filter: {
      placeholderText: "Enter a value",
    },
    width: "200px",
  },
  {
    id: "supported_protocols",
    name: "Supported protocols",
    isSortable: true,
    filter: {
      placeholderText: "Enter a value",
    },
    renderDataFunction: renderProtocolTags,
    width: "200px",
  },
];

export default function Search() {
  const [devices, setDevicesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [version, setVersion] = useState(Object.keys(VERSIONS)[0]);

  useEffect(() => {
    async function fetchData() {
      await Papa.parse(VERSIONS[version], {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: function (input) {
          const uniqueData = {};

          input.data.forEach((element) => {
            uniqueData[
              `${element.product_series}__${element.product_name}__${element.manufacturer}__${element.product_type}__${element.supported_protocols}`
            ] = element;
          });

          setDevicesData(Object.values(uniqueData));
          setIsLoading(false);
        },
      });
    }

    fetchData();
  }, [version]);

  const tabledata = useMemo(
    () =>
      devices.map(
        ({
          id,
          product_series,
          product_name,
          manufacturer,
          product_type,
          supported_protocols,
        }) => {
          return {
            id, // use the model ID as row ID
            values: {
              product_series,
              product_name,
              manufacturer,
              product_type,
              supported_protocols,
            },
          };
        }
      ) ?? [],
    [devices]
  );

  return (
    <StatefulTable
      id="search-table"
      data-test="search-table"
      secondaryTitle="Maximo Asset Monitor : Device library search"
      columns={columns}
      data={tabledata}
      actions={{
        pagination: {
          onChangePage: null,
        },
        table: {
          onRowSelected: null,
          onRowClicked: null,
          onRowExpanded: null,
          onSelectAll: null,
          onChangeSort: null,
          onApplyRowAction: null,
          onClearRowError: null,
          onEmptyStateAction: null,
          onChangeOrdering: null,
          onColumnSelectionConfig: null,
        },
        toolbar: {
          onApplyFilter: null,
          onToggleFilter: null,
          onToggleColumnSelection: null,
          onClearAllFilters: null,
          onCancelBatchAction: null,
          onApplyBatchAction: null,
          onApplySearch: null,
          onDownloadCSV: undefined,
        },
      }}
      options={{
        hasRowSelection: false,
        hasRowActions: false,
        hasSearch: true,
        hasFilter: true,
        hasPagination: true,
        pinHeaderAndFooter: true,
      }}
      view={{
        table: {
          loadingState: { isLoading },
          sort: {
            columnId: "manufacturer",
            direction: "ASC",
          },
        },
        pagination: {
          pageSize: 25,
          pageSizes: [25, 50, 100, 250, 500],
        },
        toolbar: {
          search: {
            defaultValue: undefined,
            defaultExpanded: true,
            persistent: true,
          },
          customToolbarContent: (
            <MenuButton label="Version" kind="ghost">
              <MenuItem
                label={Object.keys(VERSIONS)[0]}
                key={Object.keys(VERSIONS)[0]}
                onClick={() => setVersion(Object.keys(VERSIONS)[0])}
              />
              <MenuItem
                label={Object.keys(VERSIONS)[1]}
                key={Object.keys(VERSIONS)[1]}
                onClick={() => setVersion(Object.keys(VERSIONS)[1])}
              />
            </MenuButton>
          ),
        },
      }}
      i18n={{
        emptyMessageWithFilters: "Don't find the device you are looking for?",
        emptyMessageWithFiltersBody: (
          <div>
            Ask in
            <Link
              href={SLACK_CONTACT_LINK}
              style={{ paddingLeft: "0.5rem", paddingRight: "0.5rem" }}
            >
              <strong> #ask-mas-monitor-edc </strong>
            </Link>
            if it can be added to the library of device connectors
          </div>
        ),
      }}
    />
  );
}
