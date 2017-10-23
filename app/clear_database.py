import sys

def main():
    
    try:
        if sys.argv[1]=="delete":
            from models import db
         	
	    # delete existing table
	    db.drop_all()

	    # reinitialize blank table
	    db.create_all()
   	
	    print("\nDatabase erased and reinitialized\n")

	else:
            print("\nNothing deleted\n")

    except Exception:
	print("\nNothing deleted\n")
    
main()