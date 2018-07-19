#!/bin/bash

echo
echo "The name of the script is ${0}"

echo 
if [ -n "$1" ]; then
  echo "Parameter #1 is $1"
fi


if [ -n "${10}" ]; then # 大于 $9 就必须用 {} 括起来
  echo "Parameter #10 is $10"
fi

echo "---------------------------"
echo "All the parameters are $*"

exit 0
