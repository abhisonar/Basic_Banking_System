<?php
    include 'config.php';
    header("Access-Control-Allow-Origin: *");
    // header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
    // header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
    // header('Access-Control-Max-Age: 1000');
    // header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
    $get_query = 'SELECT * from cust_data';
    $get_result = mysqli_query($conn,$get_query);
    $rows = array();
    while ($r = mysqli_fetch_assoc($get_result)) {
        $rows[] = $r;    
    }
    print json_encode($rows);
?>