#!/bin/bash

ng build --prod --aot --base-href "http://bocoshapers.com/"
ngh --message $1
