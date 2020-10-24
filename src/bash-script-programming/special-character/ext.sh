#!/bin/bash

if [ ! -w 't.txt' ]; then
  touch t.txt
fi

echo 'hello t.txt' > t.txt;
cp t.{txt,bak}