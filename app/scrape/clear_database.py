
def main():
    try:
        from app import db

        # delete existing table
        db.drop_all()

        # reinitialize blank table
        db.create_all()

        print("\nDatabase erased and reinitialized\n")

    except Exception:
        print("\nNothing deleted\n")


if __name__ == '__main__':
    main()
