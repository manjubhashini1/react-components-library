import { useEffect, useState } from "react";

const InfiniteScroll = () => {
    const [products, setProducts] = useState([]);
    const [limit, setLimit] = useState(10);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const MAX_PRODUCTS = 190;
    const fetchData = async () => {
        if (loading) return;
        setLoading(true);
        //artifical delay to show loading
        await new Promise((resolve) => setTimeout(resolve, 1000));
        try {
            const data = await fetch(`https://dummyjson.com/products?limit=${limit}`);
            const result = await data.json();
            console.log(result);
            setProducts(result.products);

            if (result.total <= limit) {
                setHasMore(false);
            }
        }
        catch (err) {
            console.log("error fetching products:", err);
        }
        finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchData();
    }, [limit])

    //for infinite scroll
    useEffect(() => {
        let isThrottled = false;
        const handleScroll = () => {
            let bottom = document.documentElement.clientHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight - 200
            console.log("scrolling to bottom, loading more data");
            // if (bottom || loading || !hasMore) {
            //     setLimit((prevLimit) => Math.min(prevLimit + 10, MAX_PRODUCTS));
            // }
            //We loaded recently We are in the cooldown window (800 ms) So → STOP, don’t load again yet
            if (!bottom || loading || !hasMore || isThrottled) return;

            isThrottled = true;
            setLimit((prev) => Math.min(prev + 10, MAX_PRODUCTS));

            setTimeout(() => {
                isThrottled = false;
            }, 800); // 0.8s throttle
        }
        window.addEventListener('scroll', handleScroll);
        //cleanup
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading, hasMore]);



    return (
        <div>
            <p className="font-bold">Infinite scroll</p>
            <div className="flex flex-wrap gap-4">
                {products.map((product) => (
                    <div key={product.id} className="flex flex-col items-center border p-4 w-98">
                        <b>{product?.title}</b>
                        <img src={product?.thumbnail} alt={product?.title} width={100} height={100} />
                        <p className="text-left"><b>Description: </b>{product?.description}</p>
                    </div>
                ))}
            </div>
            {loading && (
                (
                    <p className="mt-4 text-center text-sm text-gray-500">
                        Loading more products...
                    </p>
                )
            )}
        </div>
    )
}

export default InfiniteScroll;