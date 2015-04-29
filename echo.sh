#!/bin/bash

echo "Started echo deamon process"

while true; do
  read text
  echo 'dddddd**' $text '**' 1>&2
done
