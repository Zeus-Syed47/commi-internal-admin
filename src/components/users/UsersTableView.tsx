import { Box, Checkbox, CircularProgress, Sheet, Table } from "@mui/joy";
import { useMemo } from "react";
import UserRow from "./UserRow";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';
export function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

export default function UsersTableView(props) {
    const { enableCheckbox, selected, setSelected, isLoading, rows, order } = props;

    const loaderView = useMemo(() => {

        return (
            <Box sx={{
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: '160vh', height: '50vh',
            }}>
                <CircularProgress size='lg' />
            </Box>
        )
    }, [isLoading])
    return (
        <Table
            aria-labelledby="tableTitle"
            stickyHeader
            hoverRow
            sx={{
                '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
                '--Table-headerUnderlineThickness': '1px',
                '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
                '--TableCell-paddingY': '4px',
                '--TableCell-paddingX': '8px',
            }}
        >
            <thead>
                <tr>
                    {enableCheckbox &&
                        <th style={{ width: '5%', textAlign: 'center', padding: '12px 6px' }}>
                            <Checkbox
                                size="sm"
                                indeterminate={
                                    selected.length > 0 && selected.length !== rows.length
                                }
                                checked={selected.length === rows.length}
                                onChange={(event) => {
                                    setSelected(
                                        event.target.checked ? rows.map((row) => row.id) : [],
                                    );
                                }}
                                color={
                                    selected.length > 0 || selected.length === rows.length
                                        ? 'primary'
                                        : undefined
                                }
                                sx={{ verticalAlign: 'text-bottom' }}
                            />
                        </th>
                    }
                    <th style={{ width: '20%', padding: '12px 6px' }}>Name</th>
                    <th style={{ width: '20%', padding: '12px 6px' }}>Email</th>
                    <th style={{ width: '40%', padding: '12px 6px' }}>Type</th>


                    <th style={{ width: '10%', padding: '12px 6px' }}>Created date</th>
                    {!enableCheckbox &&
                        <th style={{ width: '5%', padding: '12px 6px' }}> </th>
                    }
                </tr>
            </thead>
            {isLoading ? loaderView :
                rows?.length === 0 ? <tbody>
                    <tr>
                        <td >No results found.</td>
                    </tr>
                </tbody>
                    :
                    <tbody>
                        {[...rows].sort(getComparator(order, 'id')).map((row) => (
                            <UserRow
                                enableCheckbox={enableCheckbox}
                                selected={selected}
                                setSelected={setSelected}
                                row={row}
                            />
                        ))}
                    </tbody>
            }
        </Table>
    )
}