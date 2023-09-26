'use client'
import React from 'react'
import axios from 'axios';
import DataTable from 'react-data-table-component';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { selectFilter, textFilter } from 'react-bootstrap-table2-filter';
import {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator'
import { client } from '../utils/configSanity';



export default function Table() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    async function getProducts() {
        try {
          const query = `*[_type == 'schedule'] {
            _id,
            time,
            day,
            member->
          }`;
          const data = await client.fetch(query);
          setProducts(data);
          console.log(data);
          // Use the data as needed
        } catch (error) {
          console.error(error);
        }
      }


    

    // const getProducts = () => {
    //     axios('https://retoolapi.dev/X8g1Dc/data')
    //     .then((res) => {
    //         console.log(res.data);
    //         setProducts(res.data);
    //     });
    // };

    // const dayOptions = {
        
    // };

    // const timeOptions = {
    //     0: '05:30',
    //     1: '06:30',
    //     2: '07:30'
    // };

    // const voiceOptions = {
    //     0: 'Alto',
    //     1: 'Soprano',
    //     2: 'Baritone'
    // };



    const columns=[
        // {
        //     dataField: '_id',
        //     text: 'User ID',
        //     sort: true,
        // },
        {
            dataField: 'member.name',
            text: 'Name',
            sort: true,
        },
        {
            dataField: 'member.voice',
            text: 'Voice',
            sort: true,
            // formatter: cell => voiceOptions[cell],
            // filter: selectFilter({
            //     options: voiceOptions,
            // })
            filter: textFilter(),
        },
        {
            dataField: 'day',
            text: 'Day Available',
            sort: true,
            filter: textFilter(),

            // formatter: cell => dayOptions[cell],
            // filter: selectFilter({
            //     options: dayOptions,
            // })
        },
        {
            dataField: 'time',
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
