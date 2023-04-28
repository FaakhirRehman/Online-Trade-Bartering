import React from "react";
import Card from "../../components/UI/Card/Index";

/**
 * @author
 * @function PriceDetails
 **/

const PriceDetails = (props) => {
    return (
        <Card headerLeft={"Price Details"} style={{ maxWidth: "380px" }}>
            <div
                style={{
                    padding: "20px",
                    boxSizing: "border-box",
                }}
            >
                <div className="flexRow sb" style={{ margin: "10px 0" }}>
                    <div>Price ({props.totalItem} items):&nbsp; </div>
                    <div>{props.totalPrice}</div>
                </div>
                <div className="flexRow sb" style={{ margin: "10px 0" }}>
                    <div>Delivery Charges:&nbsp; </div>
                    <div>{(props.totalPrice * 0.0005) + 150 }</div>
                </div>
                <div className="flexRow sb" style={{ margin: "10px 0" }}>
                    <div>Total Amount: &nbsp;</div>
                    <div>{props.totalPrice + (props.totalPrice * 0.0005) + 150 } PKR</div>
                </div>
            </div>
        </Card>
    );
};

export default PriceDetails;