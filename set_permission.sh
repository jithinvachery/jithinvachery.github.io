!#/bin/bash

walk_dir () {
    shopt -s nullglob dotglob

    for pathname in "$1"/*; do
        if [ -d "$pathname" ]; then
	    chmod 711 "$pathname" 
            walk_dir "$pathname"
        else
            printf '%s\n' "$pathname"
	    chmod 644 "$pathname" 
        fi
    done
}

DIR=.

walk_dir "$DIR"
