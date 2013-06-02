#!/bin/bash

set -e
set -u

mkdir -p target
cd src
zip -r ../target/package.zip .
