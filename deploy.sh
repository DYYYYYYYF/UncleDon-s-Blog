#!/bin/bash

cmd="nohup npm run serve -- --port 80 >web-serve.log 2>web-serve.log &"
$cmd
