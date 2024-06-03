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

const Description = (cell) => {
    return cell.value ? cell.value : '';
};



const Date = (cell) => {
    return cell.value ? cell.value : '';
};

const Name = (cell) => {
    return cell.value ? cell.value : '';
};
const Client = (cell) => {
    return cell.value ? cell.value : '';
};

const Type = (cell) => {
    return (
        <Badge
            className={"font-size-12 badge-soft-" +
            (cell.value ===  "Not done" ? "danger" : "dark" && cell.value === "Done" ? "success" : "dark" && cell.value === "Progress" ? "warning" : "dark")}        >
            {cell.value}
        </Badge>
    );
};




export {
    Description,
    Client,
    Date,
    Name,
    Type,
};