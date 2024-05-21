import React from 'react';
import { Link } from 'react-router-dom';
import * as moment from "moment";
import { size, map } from "lodash";


const formateDate = (date, format) => {
    const dateFormat = format ? format : "DD MMM Y";
    const date1 = moment(new Date(date)).format(dateFormat);
    return date1;
};
const toLowerCase1 = str => {
    return (
        str === "" || str === undefined ? "" : str.toLowerCase()
    );
};

const Name = (cell) => {
    return cell.value ? cell.value : '';
};

const Address = (cell) => {
    return cell.value ? cell.value : '';
};

const Email = (cell) => {
    return cell.value ? cell.value : '';
};



const Telephone = (cell) => {
    return cell.value ? cell.value : '';
};
const Type = (cell) => {
    return cell.value ? cell.value : '';
};

const Img = (cell) => {
    return (
        <>
            {!cell.value ? (
                <div className="avatar-xs">
                    <span className="avatar-title rounded-circle">
                        {cell.data[0].name.charAt(0)}
                    </span>
                </div>
            ) : (
                <div>
                    <img
                        className="rounded-circle avatar-xs"
                        src={cell.value}
                        alt=""
                    />
                </div>
            )}
        </>
    );
};



export {
    Name,
    Address,
    Email,
    Telephone,
    Type,
    Img
};