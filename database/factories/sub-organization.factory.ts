import { SUPPLIER_TYPE, SubOrgType } from "@enum";
import { SubOrganization } from "@model";
import { setSeederFactory } from "typeorm-extension";



export default setSeederFactory(SubOrganization, (faker) => {
    const data = new SubOrganization();

    data.name = faker.person.jobType();
    data.storeId = faker.string.uuid();
    data.note = faker.lorem.paragraph();
    data.fax =  faker.finance.iban()
    data.type = SubOrgType.STORE
    data.supplierType = SUPPLIER_TYPE.ALL

    return data;

})