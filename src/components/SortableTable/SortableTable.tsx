import { useMemo, useState, Fragment } from "react";
import { JSX } from "react/jsx-runtime";
import "./SortableTable.css";

interface Header {
  key: string;
  value: string;
  sort: string | boolean;
  type: string;
}

interface Stats {
  mean: number;
  std: number;
}

type HtmlString = string;

interface TableContentProps {
  content: Stats | number | string | HtmlString;
  type: string;
}

interface TableData {
  [key: string]: Stats | number | string | HtmlString;
}

interface SortState {
  sortKey: string;
  sortOrder: "asc" | "desc";
  sortType: string | boolean;
  valueType: string;
}

interface SortableTableProps {
  data: TableData[];
  verticalHeaders: Header[];
  horizontalHeaders?: Header[];
}

const SortableTable = ({
  data,
  verticalHeaders = [],
  horizontalHeaders = [],
}: SortableTableProps) => {
  const [sortState, setSortState] = useState<SortState>({
    sortKey:
      horizontalHeaders.length > 0
        ? horizontalHeaders[0].key
        : verticalHeaders[0].key,
    sortOrder: "asc",
    sortType:
      horizontalHeaders.length > 0
        ? horizontalHeaders[0].sort
        : verticalHeaders[0].sort,
    valueType:
      horizontalHeaders.length > 0
        ? horizontalHeaders[0].type
        : verticalHeaders[0].type,
  });

  const handleSort = (key: string, sort: string | boolean, type: string) => {
    if (sort) {
      setSortState((prevSortState) => {
        if (prevSortState.sortKey === key) {
          return {
            sortKey: key,
            sortOrder: prevSortState.sortOrder === "asc" ? "desc" : "asc",
            sortType: sort,
            valueType: type,
          };
        } else {
          return {
            sortKey: key,
            sortOrder: "asc",
            sortType: sort,
            valueType: type,
          };
        }
      });
    }
  };

  const sortedData = useMemo(() => {
    const { sortKey, sortOrder, sortType, valueType } = sortState;
    const getValue = (content: Stats | number | string | HtmlString) => {
      if (valueType === "stats") {
        const { mean, std } = content as Stats;
        if (sortType === "mean") {
          return mean;
        } else if (sortType === "std") {
          return std;
        }
      }
      return content;
    };
    if (sortKey && sortType) {
      return [...data].sort((a, b) => {
        const valueA = getValue(a[sortKey]);
        const valueB = getValue(b[sortKey]);

        if (valueA < valueB) {
          return sortOrder === "asc" ? -1 : 1;
        }
        if (valueA > valueB) {
          return sortOrder === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return data;
  }, [data, sortState]);

  const getSortIcon = (key: string, sort: string | boolean) => {
    const { sortKey, sortOrder } = sortState;
    if (sort) {
      if (sortKey === key) {
        return sortOrder === "asc" ? "↓" : "↑";
      }
      return "↑↓";
    }
    return "";
  };

  const TableCellContent = ({ content, type }: TableContentProps) => {
    if (type === "stats") {
      const { mean, std } = content as Stats;
      return (
        <>
          {mean} ± {std}
        </>
      );
    }
    if (type === "html") {
      const htmlContent = content as HtmlString;
      return <span dangerouslySetInnerHTML={{ __html: htmlContent }} />;
    }
    return <>{content}</>;
  };

  // TODO: use flex box in css
  return (
    <table>
      <thead>
        {horizontalHeaders.map((header) => (
          <tr>
            <th
              onClick={() => handleSort(header.key, header.sort, header.type)}
            >
              {header.value}
              <span className="sort-icon">
                {getSortIcon(header.key, header.sort)}
              </span>
            </th>
            {sortedData.map((item) => (
              <th>{item[header.key] as "object"}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {verticalHeaders.map((header) => (
          <tr>
            <th
              key={header.key}
              onClick={() => handleSort(header.key, header.sort, header.type)}
            >
              {header.value}
              <span className="sort-icon">
                {getSortIcon(header.key, header.sort)}
              </span>
            </th>
            {sortedData.map((item) => (
              <td key={header.key}>
                <TableCellContent
                  content={item[header.key]}
                  type={header.type}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SortableTable;
