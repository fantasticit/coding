#!/bin/bash

echo 'Now start...';
filename=semi.sh
if [ -e "$filename" ]; then
  echo "File $filename exists."; cp $filename $filename.bak
else
  echo "File $filename not found"; touch $filename
fi;
  echo "End"