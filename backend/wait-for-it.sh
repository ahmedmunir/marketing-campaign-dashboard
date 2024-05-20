#!/bin/bash
# wait-for-it.sh is a script that waits for another service to become available

set -e

host="$1"
shift
cmd="$@"

until pg_isready -h "$host" -U "$DATABASE_USER"; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

>&2 echo "Postgres is up - executing command"
exec $cmd
