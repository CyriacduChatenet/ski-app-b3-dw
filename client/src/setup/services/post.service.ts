import { useFetch as useFetchHook } from "@/setup/hooks/useFetch.hook";
import { ShopService } from "@/setup/services/shop.service";

export class PostService {
    useFetch = new useFetchHook();
    shopService = new ShopService();

    findAll(url: string) {
        return this.useFetch.get(url);
    };

    findOne(url: string) {
        return this.useFetch.get(`${url}`);
    };

    create(url: string, credentials: Object) {
        return this.useFetch.postProtected(url, credentials, String(localStorage.getItem('acessToken')));
    };

    updateOne(url: string, credentials: Object) {
        return this.useFetch.patch(url, credentials);
    };

    async createAndUpdate(shop_url: string, post_url: string, credentials: Object) {
        const shop = await this.shopService.findOne(shop_url);
		const post = await this.create(post_url, credentials);
		await this.shopService.updateOne(shop_url, { posts: [...shop.posts, `${post._id}`]});
	};

    deleteOne(url: string, id: string) {
        return this.useFetch.delete(`${url}/${id}`, String(localStorage.getItem('acessToken')));
    };
};