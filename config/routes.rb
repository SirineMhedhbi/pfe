Rails.application.routes.draw do
  #mount_devise_token_auth_for 'User', at: 'auth'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?
  post "/company/create"  => "company#create"
  put "/company/update/:id" => "company#update"
  get "/company/index" => "company#index"
  get "/company/show/:id" => "company#show"
  delete "/company/destroy/:id" => "company#destroy"
  get "/company/userCompany" => "company#userCompany"
  put "/company/updateCompany" => "company#updateCompany"


  delete "/users/destroy/:id" => "users#destroy"
  get "/users/show" => "users#show"
  put "/users/update/:id" => "users#update"
  get "/users/index" => "users#index"
  get "/users/companies" => "users#companies"




  post "/offers/create"  => "offer#create"
  put "/offers/update/:id" => "offer#update"
  get "/offers/index" => "offer#index"
  get "/offers/show/:id" => "offer#show"
  delete "/offers/destroy/:id" => "offer#destroy"
  get "/offers/offer" => "offer#offer"



  post "/educations/create"  => "educations#create"
  put "/educations/update/:id" => "educations#update"
  get "/educations/index" => "educations#index"
  # get "/educations/show/:id" => "educations#show"
  delete "/educations/destroy/:id" => "educations#destroy"

  post "/infos/create"  => "info#create"


  post "/cvs/create"  => "cv#create"
  get "/cvs/cvUser/:id" => "cv#cvUser"



  post "/skills/create"  => "skills#create"
  put "/skills/update/:id" => "skills#update"
  get "/skills/index" => "skills#index"
  delete "/skills/destroy/:id" => "skills#destroy"


  post "/links/create"  => "links#create"
  put "/links/update/:id" => "links#update"
  get "/links/index" => "links#index"
  delete "/links/destroy/:id" => "links#destroy"

  post "/offers/create"  => "offers#create"
  put "/offers/update/:id" => "offers#update"
  get "/offers/index" => "offers#index"
  delete "/offers/destroy/:id" => "offers#destroy"
  get "/offers/show" => "offers#show"

  post "/works/create"  => "works#create"
  put "/works/update/:id" => "works#update"
  get "/works/index" => "works#index"
  delete "/works/destroy/:id" => "works#destroy"





  namespace :api do
    scope :v1 do
      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'overrides/registrations'
       }    end
  end
  

end
