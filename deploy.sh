#!/bin/bash
commit_message="'$*'"
ng build --prod --aot --base-href "http://bocoshapers.com/"
cp CNAME dist/
ngh --message "$commit_message"
