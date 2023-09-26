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

    const customTotal = (from, to, size) => (
        <span className="react-bootstrap-table-pagination-total">
          Showing { from } to { to } of { size } Results
        </span>
      );
      
      const options = {
        paginationSize: 4,
        pageStartIndex: 0,
        // alwaysShowAllBtns: true, // Always show next and previous button
        // withFirstAndLast: false, // Hide the going to First and Last page button
        // hideSizePerPage: true, // Hide the sizePerPage dropdown always
        // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
        firstPageText: 'First',
        prePageText: 'Back',
        nextPageText: 'Next',
        lastPageText: 'Last',
        nextPageTitle: 'First page',
        prePageTitle: 'Pre page',
        firstPageTitle: 'Next page',
        lastPageTitle: 'Last page',
        showTotal: true,
        paginationTotalRenderer: customTotal,
        disablePageTitle: true,
        sizePerPageList: [{
          text: '5', value: 5
        }, {
            text: '10', value: 10
        }, {
            text: '25', value: 25
        }, {
          text: 'All', value: products.length
        }] // A numeric array is also available. the purpose of above example is custom the text
      };

    const dayOptions = {
        Monday: 'Monday',
        Tuesday: 'Tuesday',
        Wednesday: 'Wednesday',
        Thursday: 'Thursday',
        Friday: 'Friday',
        Saturday: 'Saturday',
        Sunday: 'Sunday'
    };

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
            placeholder: 'Hello',
            sort: true,
            // filter: textFilter(),

            formatter: cell => dayOptions[cell],
            filter: selectFilter({
                options: dayOptions,
            }),
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
    <div className='container mx-auto py-8'>
        <h1 className='py-4'>Francis Data Table</h1>
      <BootstrapTable keyField='id' data={products} columns={columns} striped hover condensed pagination={paginationFactory(options)} filter={filterFactory()}/>
    </div>
  )
}
