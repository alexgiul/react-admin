//import CardMenu from "components/card/CardMenu";
//import Card from "components/card";

import {
  MdCreate, MdCancel
} from "react-icons/md";

import React, { useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";


const DevelopmentTable = (props) => {
  const { columnsData, tableData, onActionEditButtonClick, onActionDeleteButtonClick } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const handleEditButtonClick = (row) => {
    //console.log(row);
    // Call the callback function with the action data    
    onActionEditButtonClick(row);
  };

  const handleDeleteButtonClick = (row) => {
    //console.log(row);
    // Call the callback function with the action data    
    onActionDeleteButtonClick(row);
  };

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    //page,
    rows,
    prepareRow,
    initialState,
  } = tableInstance;
  
  initialState.pageSize = 11;
  
  return (
    <>
      <div class="h-full overflow-x-scroll xl:overflow-x-hidden">
        <table
          {...getTableProps()}
          className="mt-8 h-max w-full"
          variant="simple"
          color="gray-500"
          mb="24px"
        >
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  
                  <th {...column.getHeaderProps(column.getSortByToggleProps())} 
                   style={{ display: column.isVisible ? 'table-cell' : 'none' }} 
                    className="border-b border-gray-200 pr-32 pb-[10px] text-start dark:!border-navy-700 "
                    key={index}
                  >
                    <div className="text-xs font-bold tracking-wide text-gray-600">                    
                      {column.render("Header")}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, index) => {
              
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    let data = ""

                    if (cell.column.Header === "Actions") {
                      data = (
                          <div className="flex items-center gap-2">
                            <button onClick={() => handleEditButtonClick(row.original)}><MdCreate className="text-blue-500 h-6 w-6"/> </button>
                            {handleDeleteButtonClick ? (
                            <button onClick={() => handleDeleteButtonClick(row.original)}><MdCancel className="text-red-500 h-6 w-6"/> </button>
                            ): (<></>)}
                          </div>);                      
                    }
                    else
                      data = cell.render('Cell')

                    return (
                      <td
                        {...cell.getCellProps()}
                        key={index} style={{ display: columns[index].isVisible ? 'table-cell' : 'none' }} 
                        className="pt-[14px] pb-3 text-[14px]"
                      >
                          {data}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DevelopmentTable;
