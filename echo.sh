#!/bin/bash

echo "Started echo deamon process"

while true; do
  read text
  echo $text
done
