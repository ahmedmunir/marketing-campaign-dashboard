import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
    Button, FormGroup, FormControlLabel, Checkbox, Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, TablePagination, Paper, TableSortLabel, TextField
} from '@mui/material';
import './Dashboard.css';

const metricsOptions = {
    total_impressions: "Total Impressions",
    total_clicks: "Total Clicks",
    total_spent: "Total Spent",
    total_conversions: "Total Conversions",
    total_approved_conversions: "Total Approved Conversions",
    avg_impressions: "Average Impressions",
    avg_clicks: "Average Clicks",
    avg_spent: "Average Spent",
    avg_total_conversions: "Average Conversions",
    avg_approved_conversions: "Average Approved Conversions",
};

const Dashboard = () => {
    const [metrics, setMetrics] = useState(null);
    const [campaigns, setCampaigns] = useState([]);
    const [startDate, setStartDate] = useState(new Date('2023-01-01'));
    const [endDate, setEndDate] = useState(new Date('2026-12-31'));
    const [loading, setLoading] = useState(false);
    const [selectedMetrics, setSelectedMetrics] = useState(Object.keys(metricsOptions));
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('date');
    const [filter, setFilter] = useState('');

    const fetchMetrics = async (start, end) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/campaigns/metrics/`, {
                params: {
                    start_date: start,
                    end_date: end
                }
            });
            setMetrics(response.data);
        } catch (error) {
            console.error("Error fetching metrics data", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCampaigns = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/campaigns/`);
            setCampaigns(response.data);
        } catch (error) {
            console.error("Error fetching campaign data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMetrics(startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0]);
        fetchCampaigns();
    }, [startDate, endDate]);

    const handleMetricChange = (event) => {
        const { name, checked } = event.target;
        setSelectedMetrics(prevSelectedMetrics => 
            checked ? [...prevSelectedMetrics, name] : prevSelectedMetrics.filter(metric => metric !== name)
        );
    };

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const filteredCampaigns = campaigns.filter((campaign) =>
        Object.keys(campaign).some((key) =>
            campaign[key].toString().toLowerCase().includes(filter.toLowerCase())
        )
    );

    const sortedCampaigns = filteredCampaigns.sort((a, b) => {
        if (orderBy === 'date') {
            return (order === 'asc' ? new Date(a.start_date) - new Date(b.start_date) : new Date(b.start_date) - new Date(a.start_date));
        } else {
            return (order === 'asc' ? a[orderBy] < b[orderBy] : a[orderBy] > b[orderBy]) ? -1 : 1;
        }
    });

    const chartOption = metrics ? {
        title: {
            text: 'Campaign Metrics'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {c}'
        },
        legend: {
            show: false
        },
        xAxis: {
            type: 'value'
        },
        yAxis: {
            type: 'category',
            data: selectedMetrics.map(metric => metricsOptions[metric])
        },
        series: [
            {
                name: 'Metrics',
                type: 'bar',
                data: selectedMetrics.map(metric => metrics[metric]),
                barWidth: '30%',
            }
        ],
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
    } : null;

    return (
        <div className="dashboard-container">
            <h1>Campaign Dashboard</h1>
            <div className="controls">
                <h2 style={{textAlign: 'center'}}>Data Analysis Section</h2>
                <div className="date-pickers">
                    <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
                    <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
                    <Button variant="contained" onClick={() => fetchMetrics(startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0])} disabled={loading}>
                        {loading ? 'Loading...' : 'Update'}
                    </Button>
                </div>
                <FormGroup row className="metrics-checkboxes">
                    {Object.keys(metricsOptions).map(metric => (
                        <FormControlLabel
                            key={metric}
                            control={
                                <Checkbox 
                                    checked={selectedMetrics.includes(metric)} 
                                    onChange={handleMetricChange} 
                                    name={metric} 
                                />
                            }
                            label={metricsOptions[metric]}
                        />
                    ))}
                </FormGroup>
            </div>
            {chartOption && <ReactECharts option={chartOption} style={{ height: '400px', width: '100%' }} />}
            
            <Paper style={{ width: '100%', marginTop: '20px' }}>
                <h2 style={{textAlign: 'center'}}>Data Table Section</h2>
                <TextField
                    label="Filter"
                    variant="outlined"
                    fullWidth
                    value={filter}
                    onChange={handleFilterChange}
                    style={{ marginBottom: '10px' }}
                />
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <TableSortLabel
                                        active={orderBy === 'id'}
                                        direction={orderBy === 'id' ? order : 'asc'}
                                        onClick={() => handleRequestSort('id')}
                                    >
                                        Campaign ID
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={orderBy === 'ad_id'}
                                        direction={orderBy === 'ad_id' ? order : 'asc'}
                                        onClick={() => handleRequestSort('ad_id')}
                                    >
                                        Ad ID
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={orderBy === 'xyz_campaign_id'}
                                        direction={orderBy === 'xyz_campaign_id' ? order : 'asc'}
                                        onClick={() => handleRequestSort('xyz_campaign_id')}
                                    >
                                        XYZ Campaign ID
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={orderBy === 'fb_campaign_id'}
                                        direction={orderBy === 'fb_campaign_id' ? order : 'asc'}
                                        onClick={() => handleRequestSort('fb_campaign_id')}
                                    >
                                        FB Campaign ID
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={orderBy === 'start_date'}
                                        direction={orderBy === 'start_date' ? order : 'asc'}
                                        onClick={() => handleRequestSort('start_date')}
                                    >
                                        Start Date
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={orderBy === 'end_date'}
                                        direction={orderBy === 'end_date' ? order : 'asc'}
                                        onClick={() => handleRequestSort('end_date')}
                                    >
                                        End Date
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={orderBy === 'age'}
                                        direction={orderBy === 'age' ? order : 'asc'}
                                        onClick={() => handleRequestSort('age')}
                                    >
                                        Age
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={orderBy === 'gender'}
                                        direction={orderBy === 'gender' ? order : 'asc'}
                                        onClick={() => handleRequestSort('gender')}
                                    >
                                        Gender
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={orderBy === 'interest'}
                                        direction={orderBy === 'interest' ? order : 'asc'}
                                        onClick={() => handleRequestSort('interest')}
                                    >
                                        Interest
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={orderBy === 'impressions'}
                                        direction={orderBy === 'impressions' ? order : 'asc'}
                                        onClick={() => handleRequestSort('impressions')}
                                    >
                                        Impressions
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={orderBy === 'clicks'}
                                        direction={orderBy === 'clicks' ? order : 'asc'}
                                        onClick={() => handleRequestSort('clicks')}
                                    >
                                        Clicks
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={orderBy === 'spent'}
                                        direction={orderBy === 'spent' ? order : 'asc'}
                                        onClick={() => handleRequestSort('spent')}
                                    >
                                        Spent
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={orderBy === 'total_conversion'}
                                        direction={orderBy === 'total_conversion' ? order : 'asc'}
                                        onClick={() => handleRequestSort('total_conversion')}
                                    >
                                        Conversions
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={orderBy === 'approved_conversion'}
                                        direction={orderBy === 'approved_conversion' ? order : 'asc'}
                                        onClick={() => handleRequestSort('approved_conversion')}
                                    >
                                        Approved Conversions
                                    </TableSortLabel>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedCampaigns.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((campaign) => (
                                <TableRow key={campaign.id}>
                                    <TableCell>{campaign.id}</TableCell>
                                    <TableCell>{campaign.ad_id}</TableCell>
                                    <TableCell>{campaign.xyz_campaign_id}</TableCell>
                                    <TableCell>{campaign.fb_campaign_id}</TableCell>
                                    <TableCell>{campaign.start_date}</TableCell>
                                    <TableCell>{campaign.end_date}</TableCell>
                                    <TableCell>{campaign.age}</TableCell>
                                    <TableCell>{campaign.gender}</TableCell>
                                    <TableCell>{campaign.interest}</TableCell>
                                    <TableCell>{campaign.impressions}</TableCell>
                                    <TableCell>{campaign.clicks}</TableCell>
                                    <TableCell>{campaign.spent}</TableCell>
                                    <TableCell>{campaign.total_conversion}</TableCell>
                                    <TableCell>{campaign.approved_conversion}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={sortedCampaigns.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
};

export default Dashboard;
