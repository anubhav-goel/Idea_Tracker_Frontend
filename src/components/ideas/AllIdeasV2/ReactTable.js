import { faAngleDoubleLeft, faAngleDoubleRight, faAngleLeft, faAngleRight, faSort, faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment } from "react";
import { useFilters, usePagination, useSortBy, useTable } from "react-table";
import * as styles from "./ReactTable.module.css";

const ReactTable = ({ columns, data }) => {
	const DefaultColumnFilter = ({
		column: { filterValue, preFilteredRows, setFilter }
	}) => {
		const count = preFilteredRows.length;

		return (
			<input
				style={{ padding: "0.25rem" }}
				value={filterValue || ""}
				onChange={e => {
					setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
				}}
				placeholder={`Total ${count} records found...`}
			/>
		);
	};

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		// rows,
		page,
		prepareRow,
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		state: { pageIndex, pageSize }
	} = useTable(
		{
			columns,
			data,
			defaultColumn: { Filter: DefaultColumnFilter },
			initialState: { pageIndex: 0, pageSize: 5 }
		},
		useFilters,
		useSortBy,
		usePagination
	);

	const generateSortingOrder = column => {
		return column.isSorted ? (
			column.isSortedDesc ? (
				<FontAwesomeIcon
					icon={faSortUp}
					style={{ marginLeft: "0.35rem" }}
				/>
			) : (
					<FontAwesomeIcon
						icon={faSortDown}
						style={{ marginLeft: "0.35rem" }}
					/>
				)
		) : (
				<FontAwesomeIcon icon={faSort} style={{ marginLeft: "0.35rem" }} />
			);
	};

	const filterSearchBox = column => {
		return (
			<div style={{ margin: "0.35rem" }}>
				{column.canFilter && column.render("Filter")}
			</div>
		);
	};

	const renderTable = () => {
		return <table className={` ${styles.ideas}`} {...getTableProps()}>
			<thead>
				{headerGroups.map(headerGroup => (
					<tr {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map((column, i) => (
							<th
								key={`th-${i}`}
								{...column.getHeaderProps()}
							>
								<div {...column.getSortByToggleProps()}>
									{column.render("Header")}
									{generateSortingOrder(column)}
								</div>
								{filterSearchBox(column)}
							</th>
						))}
					</tr>
				))}
			</thead>

			<tbody {...getTableBodyProps()}>
				{page.map(row => {
					prepareRow(row);
					return (
						<tr {...row.getRowProps()}>
							{row.cells.map(cell => {
								return (
									<td {...cell.getCellProps()}>
										{cell.render("Cell")}
									</td>
								);
							})}
						</tr>
					);
				})}
			</tbody>
		</table>
	}

	const renderPagination = () => {
		return (
			<div className={`${styles.pagination}`}>
				<button
					className={`${styles.pages}`}
					onClick={() => gotoPage(0)}
					disabled={!canPreviousPage}
				>
					<FontAwesomeIcon
						icon={faAngleDoubleLeft}
						style={{ marginLeft: "0.35rem" }}
					/>
				</button>
				<button
					className={`${styles.pages}`}
					onClick={previousPage}
					disabled={!canPreviousPage}
				>
					<FontAwesomeIcon
						icon={faAngleLeft}
						style={{ marginLeft: "0.35rem" }}
					/>
				</button>
				<span className={styles.pageDescription}>
					Page{" "}
					<strong>
						{pageIndex + 1} of {pageOptions.length}
					</strong>
				</span>

				<select
					className={`${styles.showPagesList}`}
					value={pageSize}
					onChange={event => {
						setPageSize(parseInt(event.target.value, 10));
					}}
				>
					{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20].map(limit => (
						<option key={limit} value={limit}>
							Show {limit}
						</option>
					))}
				</select>

				<button
					className={`${styles.pages}`}
					onClick={nextPage}
					disabled={!canNextPage}
				>
					<FontAwesomeIcon
						icon={faAngleRight}
						style={{ marginLeft: "0.35rem" }}
					/>
				</button>
				<button
					className={`${styles.pages}`}
					onClick={() => gotoPage(pageCount - 1)}
					disabled={!canNextPage}
				>
					<FontAwesomeIcon
						icon={faAngleDoubleRight}
						style={{ marginLeft: "0.35rem" }}
					/>
				</button>
			</div>
		);
	};

	return (
		<Fragment>
			{renderTable()}
			{renderPagination()}
		</Fragment>
	);
};

export default ReactTable;
