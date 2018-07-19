#!/bin/bash

char=b

case "$char" in
  [a-z]) echo "letter";;
  [0-9]) echo "number";;
esac