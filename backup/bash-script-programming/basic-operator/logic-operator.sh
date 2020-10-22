#!/bin/bash
a=10
b=20

if [[ $a -gt 5 && $b -le 20 ]]; then 
  echo "a > 5 and b <= 20"
else :
fi