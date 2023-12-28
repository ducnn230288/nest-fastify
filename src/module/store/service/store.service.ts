import { Injectable } from "@nestjs/common";
import { BaseService } from "@shared";
import { Store } from "@model";
import { StoreRepository } from "@repository";
import { CreateStoreRequestDto } from "@dto";

export const P_STORE_LISTED = 'e5b61d1d-e020-4414-a483-44411c0ca977';
export const P_STORE_DETAIL = 'e7d078b7-0006-46b7-b68c-1310a3f2308d';
export const P_STORE_CREATE = '1eb73fec-fd5d-414e-89be-179c273ec82e';
export const P_STORE_UPDATE = 'c7e72ff8-3d34-460a-819b-22cdd6a3bce8';
export const P_STORE_DELETE = '43cee2d4-2f5b-4da3-ac5a-63d4d2db2882';

@Injectable()
export class StoreService extends BaseService<Store> {
    constructor(public readonly repo: StoreRepository) {
        super(repo);
        this.listJoin = ['products']
    }

    async create(body: CreateStoreRequestDto): Promise<Store | null> {
        const { slug, ...data } = body;
        if (!slug) {
            return super.create({
                ...data,
                slug: await this.getSlug(data.name)
            })
        }
        return super.create(body);
    }

    async getSlug(name: string): Promise<string> {
        const lowerCaseName = name.toLowerCase().trim();
        const sanitizedString = lowerCaseName.replace(/[^\w\s-]/g, '');
        const slug = sanitizedString.replace(/\s+/g, '-');
        const finalSlug = slug.slice(0, 50);

        return slug;
    }
}