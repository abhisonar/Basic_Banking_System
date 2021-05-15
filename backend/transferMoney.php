<?php
include 'config.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

    // getting json data from react
    $rest_json = file_get_contents("php://input");
    $_POST = json_decode($rest_json, true);

    if(!empty($_POST['sender']) && !empty($_POST['receiver']) && !empty($_POST['amount'])){
        // storing transaction details into variables
        $amount = (int)$_POST['amount'];
        $sender_id = (int)$_POST['sender'];
        $receiver_id = (int)$_POST['receiver'];

        
        $sender_detail = mysqli_fetch_assoc(mysqli_query($conn,"SELECT cust_name,cust_curr_bal from cust_data where cust_id='".$sender_id."'"));
        $receiver_datail = mysqli_fetch_assoc(mysqli_query($conn, "SELECT cust_name,cust_curr_bal from cust_data where cust_id='" . $receiver_id . "'"));

        // verifying that transfer amount should not be greater than sender's current balance
        if ($amount > $sender_detail) {
            echo json_encode(["success"=>false,"message"=>"Sender's current balance should not less than transfer amount"]);
        }

        // updating sender's balance after transaction
        mysqli_query($conn,"UPDATE cust_data set cust_curr_bal=".(int)($sender_detail["cust_curr_bal"]-$amount)." where cust_id=".$sender_id."");

        // updating receiver's balance after transaction
        mysqli_query($conn, "UPDATE cust_data set cust_curr_bal=".(int)($receiver_datail["cust_curr_bal"] + $amount)." where cust_id=".$receiver_id ."");

        // inserting transaction record into transactions table
        $timestamp = date("Y-m-d H:i:s");
        mysqli_query($conn, "INSERT into transactions (sender_name,receiver_name,tnx_amount,tnx_timestamp) values ('". $sender_detail['cust_name'] . "','" . $receiver_datail['cust_name'] . "','" . $amount . "','" . $timestamp . "')");
        // returning json data to react component
        echo json_encode(array("success" => true));

    }
?>