// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import AddIcon from '@mui/icons-material/Add';
// import DeleteIcon from '@mui/icons-material/DeleteOutlined';
// import SaveIcon from '@mui/icons-material/Save';
// import RestoreIcon from '@mui/icons-material/Restore';
// import LoadingButton from '@mui/lab/LoadingButton';
// import {
//   GridRowsProp,
//   GridRowModesModel,
//   DataGridPremium,
//   GridColDef,
//   GridToolbarContainer,
//   GridActionsCellItem,
//   GridRowId,
//   gridClasses,
//   useGridApiRef,
//   GridRenderEditCellParams,
//   GridValidRowModel,
//   DataGridPremiumProps,
//   GridRowModes,
// } from '@mui/x-data-grid-premium';

// import {
//   alpha, Autocomplete, Grid, TextField, Typography, Drawer,
// } from '@mui/material'
// import { styled } from "@mui/system";
// import { getExpenseCategories } from 'src/apis/updateExpenseCategory';
// import { useMutation, useQuery } from "react-query";
// import { useRef, useCallback, useMemo, useState, useEffect } from 'react';
// import { createExpenseCategoryLimit, deleteExpenseCategoryLimit, getExpenseLimit, updateExpenseCategoryLimit } from 'src/apis/cards/updateExpenseCategoryLimit';
// import toast from 'react-hot-toast';
// import { Chip } from '@mui/material';



// const StyledDataGrid = styled(DataGridPremium)(({ theme }) => ({
//   [`.${gridClasses.menuIcon}`]: {
//     visibility: "visible",
//     width: "auto"
//   },
//   [`& .${gridClasses.row}`]: {
//     cursor: 'pointer',
//   },
//   [`& .${gridClasses.columnHeaders}`]: {
//     borderRadius: '0px',
//   },
//   [`& .${gridClasses.row}.even`]: {
//     backgroundColor: theme.palette.mode == 'light' ? theme.palette.grey[100] : theme.palette.customColors.darkBg,
//     '&:hover, &.Mui-hovered': {
//       backgroundColor: theme.palette.mode == 'light' ? alpha(theme.palette.primary.main, 0.05) : alpha(theme.palette.primary.dark, 0.05),
//       '@media (hover: none)': {
//         backgroundColor: 'transparent',
//       },
//     },
//     '&.Mui-selected': {
//       backgroundColor: alpha(
//         theme.palette.primary.main,
//         0.05 + theme.palette.action.selectedOpacity,
//       ),
//       '&:hover, &.Mui-hovered': {
//         backgroundColor: alpha(
//           theme.palette.primary.main,
//           0.05 +
//           theme.palette.action.selectedOpacity +
//           theme.palette.action.hoverOpacity,
//         ),
//         // Reset on touch devices, it doesn't add specificity
//         '@media (hover: none)': {
//           backgroundColor: alpha(
//             theme.palette.primary.main,
//             0.05 + theme.palette.action.selectedOpacity,
//           ),
//         },
//       },
//     },
//   },
// }));

// interface EditToolbarProps {
//   setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
//   setRowModesModel: (
//     newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
//   ) => void;
//   rows: any[];
// }



// export default function FullFeaturedCrudGrid(props) {
//   const [rows, setRows] = React.useState([]);
//   const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

//   const apiRef = useGridApiRef();


//   const [hasUnsavedRows, setHasUnsavedRows] = React.useState(false);
//   const unsavedChangesRef = useRef<{
//     unsavedRows: Record<GridRowId, GridValidRowModel>;
//     rowsBeforeChange: Record<GridRowId, GridValidRowModel>;
//   }>({
//     unsavedRows: {},
//     rowsBeforeChange: {},
//   });
//   const [isSaving, setIsSaving] = React.useState(false);

//   const { data: expenseCategories, isLoading: expenseCategoriesLoading } = useQuery('expenseCategory', getExpenseCategories)

//   const { data: expenseLimit, isLoading: isExpenseLimitLoading, refetch: refetchExpense } =
//     useQuery('expenseLimit', () => getExpenseLimit({ id: props?.cardId }))

//   useEffect(() => {
//     if (expenseLimit?.data?.advanced_velocity_limits?.length > 0 && expenseCategories?.length > 0) {
//       const tempLimit = expenseLimit?.data?.advanced_velocity_limits?.map(limit => {
//         return {
//           id: limit.id,
//           velocityLimitId: limit?.velocity_limit?.id,
//           amount: limit?.amount,
//           period: limit?.velocity_limit?.period,
//           frequency: limit?.velocity_limit?.frequency,
//           expense_category_ids: expenseCategories?.filter(category => limit?.velocity_limit?.expense_category_ids?.map(ecl => parseInt(ecl))?.some(ecl1 => ecl1 === category?.id))
//         }
//       });
//       setRows(tempLimit)
//     }
//   }, [expenseCategories, expenseLimit?.data?.advanced_velocity_limits])

//   const { mutate: createExpenseLimit, isLoading: isCreateExpenseLimit } = useMutation('createExpenseLimit',
//     (data) => {
//       createExpenseCategoryLimit({ id: props?.cardId, body: data });
//     },
//     {
//       onSuccess: () => {
//         refetchExpense()
//       }
//     })

//   const { mutate: updateExpenseLimit, isLoading: isUpdateExpenseLimit } = useMutation('updateExpenseLimit',
//     (data) => {
//       updateExpenseCategoryLimit({ id: props?.cardId, body: data });
//     },
//     {
//       onSuccess: () => {
//         refetchExpense()
//       }
//     })

//   const { mutate: deleteExpenseLimit, isLoading: isDeleteExpenseLimit } = useMutation('deleteExpenseLimit',
//     (data) => {
//       deleteExpenseCategoryLimit({ id: props?.cardId, limitId: data });
//     },
//     {
//       onSuccess: () => {
//         refetchExpense()
//       }
//     })

//   //  processRowUpdate
//   const processRowUpdate: NonNullable<DataGridPremiumProps['processRowUpdate']> = useCallback((
//     newRow,
//     oldRow,
//   ) => {

//     const rowId = newRow.id;
//     unsavedChangesRef.current.unsavedRows[rowId] = newRow;
//     if (!unsavedChangesRef.current.rowsBeforeChange[rowId]) {
//       unsavedChangesRef.current.rowsBeforeChange[rowId] = oldRow;
//     }
//     const tempRows = [...rows];
//     const updatedRows = tempRows.map(item => {
//       if (item?.id === newRow?.id) {
//         return newRow;
//       }
//       else return item;
//     })
//     setRows(updatedRows);
//     setHasUnsavedRows(true);
//     return newRow;
//   }, [rows]);



//   const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
//     setRowModesModel(newRowModesModel);
//   };

//   const EditToolbar = useCallback((props: EditToolbarProps) => {
//     const { setRows, setRowModesModel, apiRef, hasUnsavedRows, isSaving, rows } = props;


//     const getRandomNumber = (min, max) => {
//       return Math.floor(Math.random() * (max - min + 1) + min)
//     }

//     const handleClick = () => {

//       const tempRows = [...rows];
//       console.log('tempRows pre', tempRows);

//       let id = getRandomNumber(1, 100);

//       while (tempRows.some(row => row?.id === id)) {
//         id = getRandomNumber(1, 100);
//       }
//       tempRows.push({ id, amount: 0, frequency: 0, period: 'MONTHLY', expense_category_ids: [], isNew: true })
//       setRows(tempRows);
//       setRowModesModel((oldModel) => ({
//         ...oldModel,
//         [id]: {
//           mode: GridRowModes.Edit,
//           fieldToFocus: 'expense_category_ids'
//         },
//       }));

//     };


//     const discardChanges = () => {
//       setHasUnsavedRows(false);
//       apiRef.current.updateRows(
//         Object.values(unsavedChangesRef.current.rowsBeforeChange),
//       );
//       unsavedChangesRef.current = {
//         unsavedRows: {},
//         rowsBeforeChange: {},
//       };

//       // delete rows with isNew
//     };

//     const saveChanges = async () => {
//       try {
//         // Persist updates in the database
//         setIsSaving(true);

//         console.log('Saving changes', unsavedChangesRef.current)
//         const unSavedRows = Object.values(unsavedChangesRef.current.unsavedRows);


//         // delete rows with isNew

//         if (unSavedRows?.filter?.(row => row?._action === 'delete' && row?.isNew)?.length > 0) {
//           setRows(rows?.filter(row => row?._action !== 'delete' && !row?.isNew))
//         }

//         // delete rows with not isNew

//         if (unSavedRows?.filter?.(row => row?._action === 'delete' && !row?.isNew)?.length > 0) {

//           unSavedRows?.filter?.(row => row?._action === 'delete' && !row?.isNew).forEach(async element => {
//             await deleteExpenseLimit(element?.id)
//           });
//           toast.success('Expense category limit updated successfully!')

//         }

//         // update existing rows
//         if (unSavedRows?.filter?.(row => !row?.isNew && row?._action !== 'delete')?.length > 0) {
//           const newRows = unSavedRows?.filter?.(row => !row?.isNew)?.map(row => {
//             return {
//               id: row?.id,
//               period: row?.period,
//               frequency: row?.frequency,
//               amount: row?.amount,
//               expense_category_ids: row?.expense_category_ids?.map(category => category?.id)
//             }
//           });
//           newRows.forEach(async (row) => await updateExpenseLimit(row));
//           toast.success('Expense category limit updated successfully!')
//         }

//         // create new rows

//         if (unSavedRows?.filter?.(row => row?.isNew && row?._action !== 'delete')?.length > 0) {
//           const newRows = unSavedRows?.filter?.(row => row?.isNew)?.map(row => {
//             return {
//               period: row?.period,
//               frequency: row?.frequency,
//               amount: row?.amount,
//               expense_category_ids: row?.expense_category_ids?.map(category => category?.id)
//             }
//           });
//           newRows.forEach(async (row) => await createExpenseLimit(row));
//           toast.success('Expense category limit created successfully!')
//         }

//         setIsSaving(false);

//         setHasUnsavedRows(false);

//         unsavedChangesRef.current = {
//           unsavedRows: {},
//           rowsBeforeChange: {},
//         };
//       } catch (error) {
//         setIsSaving(false);
//       }
//     };

//     return (
//       <GridToolbarContainer sx={{ justifyContent: 'space-between' }}>

//         <Grid>
//           <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
//             Add Expense category Limit
//           </Button>
//         </Grid>

//         <Grid>

//           <LoadingButton
//             disabled={!hasUnsavedRows}
//             loading={isSaving}
//             onClick={saveChanges}
//             startIcon={<SaveIcon />}
//             loadingPosition="start"
//           >
//             <span>Save</span>
//           </LoadingButton>
//           <Button
//             disabled={!hasUnsavedRows || isSaving}
//             onClick={discardChanges}
//             startIcon={<RestoreIcon />}
//           >
//             Discard all changes
//           </Button>
//         </Grid>


//       </GridToolbarContainer>
//     );
//   }, [createExpenseLimit, deleteExpenseLimit, rows, updateExpenseLimit]);

//   function CustomExpenseCategoriesSelection(params: GridRenderEditCellParams) {

//     const { id, value: valueProp, field } = params;

//     const handleSelection = (e, v) => {
//       apiRef.current.setEditCellValue({ id, field, value: v });
//     }

//     return (
//       <Autocomplete
//         {...params}
//         multiple
//         value={valueProp ?? []}
//         options={expenseCategories ?? []}
//         loading={expenseCategoriesLoading}
//         getOptionLabel={(option: any) => option.title}
//         id="Limit by Expense Category"
//         autoComplete
//         onChange={handleSelection}
//         sx={{ width: '100%', height: '100%', zIndex: 1000 }}
//         renderInput={(params) => (
//           <TextField
//             {...params} helperText="Select" />
//         )}
//       />
//     )
//   }

//   const chipDisplay = useCallback((name) => {
//     return (
//       <Chip
//         label={name}
//         variant="outlined"
//         sx={{
//           m: 1,
//           borderRadius: 1,
//           fontSize: 14,
//         }}
//       />
//     )
//   }, [])


//   const columns: GridColDef[] = React.useMemo(() => [
//     {
//       field: 'expense_category_ids',
//       headerName: 'Expense Categories',
//       width: 320,
//       editable: true,
//       renderCell: (params: any) => {
//         return (
//           <Grid>
//             {params?.row?.expense_category_ids?.length < 0 ?
//               <Typography>
//                 '-'
//               </Typography> : <Grid>{params?.row?.expense_category_ids?.map((value: any) => { return chipDisplay(value.title) })}</Grid>
//             }
//           </Grid>
//         )
//       },
//       renderEditCell: CustomExpenseCategoriesSelection,
//     },
//     {
//       field: 'period', headerName: 'Period', width: 180,
//       type: 'singleSelect',
//       valueOptions: ["MONTHLY", "WEEKLY", "YEARLY"],
//       editable: true
//     },
//     {
//       field: 'frequency', headerName: 'Frequency', width: 180,
//       editable: true,
//       type: 'number',
//       align: 'left',
//       headerAlign: 'left',
//     },
//     {
//       field: 'amount',
//       headerName: 'Amount',
//       type: 'number',
//       width: 220,
//       align: 'left',
//       headerAlign: 'left',
//       editable: true,
//       renderCell: (params: any) => {
//         return (
//           <Grid sx={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
//             <Typography>{params?.row?.amount}</Typography> <Typography variant='caption' sx={{ ml: 2, alignSelf: 'center' }}>{'AED'}</Typography>
//           </Grid>
//         )
//       }
//     },
//     {
//       field: 'velocityLimitId',
//       headerName: 'Velocity Limit ID',
//       hide: true
//     },
//     {
//       field: 'actions',
//       type: 'actions',
//       headerName: 'Actions',
//       width: 160,
//       cellClassName: 'actions',
//       getActions: ({ id, row }) => {
//         return [
//           <GridActionsCellItem
//             icon={<RestoreIcon />}
//             label="Discard changes"
//             disabled={unsavedChangesRef.current.unsavedRows[id] === undefined}
//             onClick={() => {
//               apiRef.current.updateRows([
//                 unsavedChangesRef.current.rowsBeforeChange[id],
//               ]);
//               delete unsavedChangesRef.current.rowsBeforeChange[id];
//               delete unsavedChangesRef.current.unsavedRows[id];
//               setHasUnsavedRows(
//                 Object.keys(unsavedChangesRef.current.unsavedRows).length > 0,
//               );
//             }}
//           />,
//           <GridActionsCellItem
//             icon={<DeleteIcon />}
//             label="Delete"
//             onClick={() => {
//               unsavedChangesRef.current.unsavedRows[id] = {
//                 ...row,
//                 _action: 'delete',
//               };
//               if (!unsavedChangesRef.current.rowsBeforeChange[id]) {
//                 unsavedChangesRef.current.rowsBeforeChange[id] = row;
//               }
//               setHasUnsavedRows(true);
//               apiRef.current.updateRows([row]); // to trigger row render
//             }}
//           />,
//         ];
//       },
//     },
//   ], [apiRef, CustomExpenseCategoriesSelection, chipDisplay]);


//   const table = useMemo(() => {
//     return (
//       <Box
//         sx={{
//           height: 400,
//           width: '100%',
//           '& .actions': {
//             color: 'text.secondary',
//           },
//           '& .textPrimary': {
//             color: 'text.primary',
//           },
//         }}
//       >
//         <StyledDataGrid
//           disableAggregation
//           editMode="row"
//           apiRef={apiRef}
//           rows={rows}
//           getRowHeight={() => 'auto'}
//           columns={columns}
//           loading={isExpenseLimitLoading || isSaving}
//           rowModesModel={rowModesModel}
//           experimentalFeatures={{ newEditingApi: true }}
//           onRowModesModelChange={handleRowModesModelChange}
//           processRowUpdate={processRowUpdate}
//           components={{
//             Toolbar: EditToolbar,
//           }}
//           componentsProps={
//             {
//               toolbar: {
//                 setRows, setRowModesModel, rows, apiRef, hasUnsavedRows, isSaving
//               },
//             }}
//         />
//       </Box>
//     )
//   }, [apiRef, rows, columns, isExpenseLimitLoading, isSaving, rowModesModel, processRowUpdate, EditToolbar, hasUnsavedRows])

//   return table;
// }
