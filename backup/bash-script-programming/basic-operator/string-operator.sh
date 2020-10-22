#!/bin/bash
a="abc"
b="edf"
c=""

if [ $a = $b ]; then
  echo "$a = $b : a == b"
fi

if [ -n $a ]; then
  echo "-n $a: The string $a's length is not 0"
fi

if [ !$c ]; then
  echo "$c: The string $c is empty"
fi