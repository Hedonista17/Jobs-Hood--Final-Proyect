import api.domain.company.repository as Repository
import api.handle_response as Response
from api.functions import verify_user
import api.domain.user.repository as UserRepository


def get_companies():
    resultado = Repository.get_companies()
    return Response.response_ok(resultado, "Todas las empresas", 201)

def register_company(data):

    new_company = verify_user(data)
    
    if new_company.get("error") is not None:
        return new_company

    return Repository.register_company(data, #se crea una empresa haciendo referencia a los campos de Company
        data['address'], 
        data['province'], 
        data['cif']
        )
    
def edit_user_company(user_id,info):
 
    company = Repository.get_company_by_user_id(user_id)
    if company is None:
        return None
    if user_id == company.user_id:
        user =  UserRepository.edit_user_by_role(user_id, info)
        edited_company = Repository.edit_user_company(info,company)
        return user 
    return None
 
