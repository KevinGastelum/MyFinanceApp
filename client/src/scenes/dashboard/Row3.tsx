import BoxHeader from '@/components/BoxHeader'
import DashboardBox from '@/components/DashboardBox'
import FlexBetween from '@/components/FlexBetween'
import {
  useGetKpisQuery,
  useGetProductsQuery,
  useGetTransactionsQuery,
} from '@/state/api'
import { Box, useTheme, Typography } from '@mui/material'
import { DataGrid, GridCellParams } from '@mui/x-data-grid'
import { useMemo } from 'react'
import { PieChart, Pie, Cell } from 'recharts'

const Row3 = () => {
  const { palette } = useTheme()
  const pieColors = [palette.primary[800], palette.primary[500]]
  const { data: kpiData } = useGetKpisQuery()
  const { data: productData } = useGetProductsQuery()
  const { data: transactionData } = useGetTransactionsQuery()

  const pieChartData = useMemo(() => {
    if (kpiData) {
      const totalExpenses = kpiData[0].totalExpenses
      return Object.entries(kpiData[0].expensesByCategory).map(
        ([key, value]) => {
          return [
            {
              name: key,
              value: value,
            },
            {
              name: `${key} of Total`,
              value: totalExpenses - value,
            },
          ]
        }
      )
    }
  }, [kpiData])

  const productColumns = [
    {
      field: '_id',
      headerName: 'id',
      flex: 1,
    },
    {
      field: 'expense',
      headerName: 'Cost', //Expense
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: 'price',
      headerName: 'Price',
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
  ]

  const transactionColumns = [
    {
      field: '_id',
      headerName: 'id',
      flex: 1,
    },
    {
      field: 'buyer',
      headerName: 'Buyer',
      flex: 0.67,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      flex: 0.35,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: 'productIds',
      headerName: 'Count',
      flex: 0.1,
      renderCell: (params: GridCellParams) =>
        (params.value as Array<string>).length,
    },
  ]
  return (
    <>
      {/* GRID AREA "g" */}
      <DashboardBox gridArea='g'>
        <BoxHeader
          title='Products list'
          sideText={`${productData?.length} Products`}
        />
        <Box
          mt='0.5rem'
          p='0 0.5rem'
          height='75%'
          sx={{
            '& .MuiDataGrid-root': {
              color: palette.grey[300],
              border: 'none',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            '& .MuiDataGrid-columnHeaders': {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            '& .MuiDataGrid-columnSeperator': {
              visibility: 'hidden',
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={productData || []}
            columns={productColumns}
          />
        </Box>
      </DashboardBox>
      {/* GRID AREA "h" */}
      <DashboardBox gridArea='h'>
        <BoxHeader
          title='Transactions list'
          sideText={`${transactionData?.length} Latest Transactions`}
        />
        <Box
          mt='0.5rem'
          p='0 0.5rem'
          height='85%'
          sx={{
            '& .MuiDataGrid-root': {
              color: palette.grey[300],
              border: 'none',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            '& .MuiDataGrid-columnHeaders': {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            '& .MuiDataGrid-columnSeperator': {
              visibility: 'hidden',
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={transactionData || []}
            columns={transactionColumns}
          />
        </Box>
      </DashboardBox>
      {/* GRID AREA "i" */}
      <DashboardBox gridArea='i'>
        <BoxHeader title='Expense Breakdown by Category' sideText='+9%' />
        <FlexBetween mt='0.5rem' gap='0.5rem' p='0 1rem' textAlign='center'>
          {pieChartData?.map((data, i) => (
            <Box key={`${data[0].name}-${i}`}>
              <PieChart width={110} height={100}>
                <Pie
                  stroke='none'
                  data={data}
                  innerRadius={18}
                  outerRadius={35}
                  paddingAngle={2}
                  dataKey='value'
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index]} />
                  ))}
                </Pie>
              </PieChart>
              <Typography variant='h5'>{data[0].name}</Typography>
            </Box>
          ))}
        </FlexBetween>
      </DashboardBox>
      {/* GRID AREA "j" */}
      <DashboardBox gridArea='j'>
        <BoxHeader
          title='Overall Summary and Explanation Data'
          sideText='+4%'
        />
        <Box
          height='15px'
          margin='1.25rem 1rem 0.4rem 1rem'
          bgcolor={palette.primary[800]}
          borderRadius='1rem'
        >
          <Box
            height='15px'
            bgcolor={palette.primary[600]}
            borderRadius='1rem'
            width='40%'
          ></Box>
        </Box>
        <Typography margin='0 1rem' variant='h4'>
          Financial Dashboard built by{' '}
          <a href='https://github.com/KevinGastelum' target='_blank'>
            Kevin G
          </a>
          , to provide a comprehensive overview of a company's financial health.
          The data displayed is updated in real-time, ensuring that decisions
          can be informed by the most current information available. Machine
          Learning forecast can be viewed by clicking "predictions" ON THE TOP
          RIGHT.
        </Typography>
      </DashboardBox>
    </>
  )
}

export default Row3
