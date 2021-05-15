<?php
include 'config.php';
header("Access-Control-Allow-Origin: *");
// header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
// header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
// header('Access-Control-Max-Age: 1000');
// header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
if (isset($_GET["cust_id"])) {
    $get_cust_query = "SELECT * from cust_data where cust_id != " . (int)$_GET['cust_id'] . "";
    $get_cust_result = mysqli_query($conn, $get_cust_query);
    $cust = array();
    while ($r = mysqli_fetch_assoc($get_cust_result)) {
        $cust[] = $r;
    }
    print json_encode($cust);
}
?>