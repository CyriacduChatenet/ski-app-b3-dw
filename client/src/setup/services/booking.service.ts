import { useFetch as useFetchHook } from "@/setup/hooks/useFetch.hook";
import { Booking } from "@/setup/types/booking.type";

export class BookingService implements Booking {
    useFetch = new useFetchHook();

    findAll(url: string) {
        return this.useFetch.get(url);
    };

    findOne(url: string, id: string) {
        return this.useFetch.get(`${url}/${id}`);
    };

    create(url: string, credentials: Object) {
        return this.useFetch.post(url, credentials);
    };

    updateOne(url: string, credentials: Object) {
        return this.useFetch.put(url, credentials);
    };

    deleteOne(url: string, id: string) {
        return this.useFetch.delete(`${url}/${id}`);
    };
};