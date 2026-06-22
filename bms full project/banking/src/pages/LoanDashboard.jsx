const dispatch =
    useDispatch();

useEffect(() => {

    dispatch(
        getAllLoans()
    );

}, []);