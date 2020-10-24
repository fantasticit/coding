#!/bin/bash
a=10
b=20

echo "a + b = `expr $a + $b`"
echo "a - b = `expr $a - $b`"
echo "a * b = `expr $a \* $b`"
echo "a / b = `expr $a / $b`"
echo "a % b = `expr $a % $b`"

if [ $a == $b ]; then
  echo "a == b"
else
  echo "a != b"
fi