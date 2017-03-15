#!/bin/bash

ng build --prod --aot --base-href "https://bocoshapers.github.io/website/"
ngh --message $1
