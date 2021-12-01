<?php

$name = $_POST['name'];
$phone = $_POST['phone'];
$token = "2103130995:AAG78x7ypTGLaCdEwBnMwyYo4cq8tJ5FZAU";
$chat_id = "-774277439";
$arr = array(
  'Name: ' => $name,
  'Phone: ' => $phone
);

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

if ($sendToTelegram) {
    echo "Sent";
} else {
    echo "Error";
}
?>
