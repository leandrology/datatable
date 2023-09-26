'use client'
import React from 'react'
import axios from 'axios';
import DataTable from 'react-data-table-component';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { selectFilter, textFilter } from 'react-bootstrap-table2-filter';
import {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator'

export default function Table() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = () => {
        axios('https://retoolapi.dev/X8g1Dc/data')
        .then((res) => {
            console.log(res.data);
            setProducts(res.data);
        });
    };

    const dayOptions = {
        
    };

    const timeOptions = {
        0: '05:30',
        1: '06:30',
        2: '07:30'
    };

    const voiceOptions = {
        0: 'Alto',
        1: 'Soprano',
        2: 'Baritone'
    };



    const columns=[
        {
            dataField: 'id',
            text: 'User ID',
            sort: true,
        },
        {
            dataField: 'fullName',
            text: 'Name',
            sort: true,
        },
        {
            dataField: 'col3',
            text: 'Voice',
            sort: true,
            // formatter: cell => voiceOptions[cell],
            // filter: selectFilter({
            //     options: voiceOptions,
            // })
            filter: textFilter(),
        },
        {
            dataField: 'col1',
            text: 'Day Available',
            sort: true,
            filter: textFilter(),

            // formatter: cell => dayOptions[cell],
            // filter: selectFilter({
            //     options: dayOptions,
            // })
        },
        {
            dataField: 'col2',
            text: 'Time Available',
            sort: true,
            filter: textFilter(),

            // formatter: cell => timeOptions[cell],
            // filter: selectFilter({
            //     options: timeOptions,
            // })
        },
    ];
  
  return (
    <div>
      <BootstrapTable keyField='id' data={products} columns={columns} striped hover condensed pagination={paginationFactory()} filter={filterFactory()}/>
    </div>
        
        // <BootstrapTable keyField='id' data={ products } columns={ columns1 } filter={ filterFactory() } />
  )
}
