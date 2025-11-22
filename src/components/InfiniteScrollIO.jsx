import { useEffect, useState, useRef } from "react";
import Card from "./Card";

const InfiniteScrollIO = () => {
    const [products, setProducts] = useState([]);
    const [limit, setLimit] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const sentinelRef = useRef(null);
    const MAX_PRODUCTS = 50;
    const fetchData = async () => {
        if (loading) return;
        setLoading(true);
        //artifical delay to show loading
        await new Promise((resolve) => setTimeout(resolve, 1000));
        try {
            const data = await fetch(`https://dummyjson.com/products?limit=10&skip=${limit}`);
            console.time();
            const result = await data.json();
            console.log(result);
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
        }
    }
    useEffect(() => {
        fetchData();
    }, [limit])

    //for infinite scroll Intersection Observer
    useEffect(() => {
        let options = {
            root: null, //by default is viewport
            rootMargin: '0px',
            threshold: 1.0 // when 100% of the target is visible
        }
        const sentinel = sentinelRef.current;
        if (!sentinel) return;

        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            if (entry.isIntersecting && !loading && hasMore) {
                setLimit((prev) => Math.min(prev + 10, MAX_PRODUCTS));
            }
        }, options);
        observer.observe(sentinelRef.current);


        //cleanup
        return () => {
            observer.unobserve(sentinel);
            observer.disconnect();
        }

    }, [loading, hasMore]);



    return (
        <div>
            <h1 className="font-bold mb-1">Infinite scroll Intersection Observer</h1>
            <h2 className="mb-4">Avoids uneccesary scroll events, throttle!!</h2>

            <div className="flex flex-wrap gap-4 justify-center">
                {products.map((product, i) => (
                    <Card key={i} heading="Infinite scroll Manual Throttle" title={product?.title} img={product?.thumbnail} description={product?.description} ></Card>
                ))}
            </div>
            <div ref={sentinelRef} className="h-10"></div>
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

export default InfiniteScrollIO;