import React from 'react';
import { Link } from 'react-router-dom';
import * as moment from "moment";
import { size, map } from "lodash";
import { Badge } from 'reactstrap';


const toLowerCase1 = str => {
    return (
        str === "" || str === undefined ? "" : str.toLowerCase()
    );
};

const Product = (cell) => {
    return cell.value ? cell.value : '';
};

const Price = (cell) => {
    return cell.value ? cell.value : '';
};

const Date = (cell) => {
    return cell.value ? cell.value : '';
};

const Name = (cell) => {
    return cell.value ? cell.value : '';
};

const State = (cell) => {
    return (
        <Badge
            className={"font-size-12 badge-soft-" +
            (cell.value ===  "Not done" ? "danger" : "dark" && cell.value === "Done" ? "success" : "dark" && cell.value === "Progress" ? "warning" : "dark")}        >
            {cell.value}
        </Badge>
    );
};


const Img = (cell) => {
    return (
        <>
            {!cell.value ? (
                <div className="avatar-xs">
                    <span className="avatar-title rounded-circle">
                        {cell.data[0].product.charAt(0)}
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
    Product,
    Price,
    Date,
    Name,
    State,
    Img
};