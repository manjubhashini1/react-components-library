import { useEffect, useState } from "react";
import Card from "./Card";

const InfiniteScroll = () => {
    const [products, setProducts] = useState([]);
    const [limit, setLimit] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const MAX_PRODUCTS = 190;
    const fetchData = async () => {
        console.time("pageFetch");
        if (loading) return;
        setLoading(true);
        //artifical delay to show loading
        await new Promise((resolve) => setTimeout(resolve, 1000));
        try {
            //improved code with skip
            const data = await fetch(`https://dummyjson.com/products?limit=10&skip=${limit}`);
            console.time();
            const result = await data.json();
            console.log(result);
            //setProducts(result.products);
            setProducts((prev) => [...prev, ...result.products]);

            if (result.total <= limit) {
                setHasMore(false);
            }
        }
        catch (err) {
            console.log("error fetching products:", err);
        }
        finally {
            setLoading(false);
            console.timeEnd("pageFetch");
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
            <h1 className="font-bold mb-8">Infinite scroll Manual Throttle</h1>

            <div className="flex flex-wrap gap-4 justify-center">
                {products.map((product) => (
                    <Card heading="Infinite scroll Manual Throttle" title={product?.title} img={product?.thumbnail} description={product?.description} ></Card>
                ))}
            </div>
            {loading && (
                (
                    <h2 className="mt-4 text-center text-sm text-gray-500 font-bold">
                        Loading more products...
                    </h2>
                )
            )}
        </div>
    )
}

export default InfiniteScroll;