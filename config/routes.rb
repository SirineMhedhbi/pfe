Rails.application.routes.draw do
  #mount_devise_token_auth_for 'User', at: 'auth'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?
  post "/company/create"  => "company#create"
  put "/company/update/:id" => "company#update"
  get "/company/index" => "company#index"
  get "/company/show/:id" => "company#show"
  delete "/company/destroy/:id" => "company#destroy"

  delete "/users/destroy/:id" => "users#destroy"
  get "/users/show" => "users#show"
  put "/users/update/:id" => "users#update"


  post "/offers/create"  => "offer#create"
  put "/offers/update/:id" => "offer#update"
  get "/offers/index" => "offer#index"
  get "/offers/show/:id" => "offer#show"
  delete "/offers/destroy/:id" => "offer#destroy"


  post "/educations/create"  => "educations#create"
  put "/educations/update/:id" => "educations#update"
  get "/educations/index" => "educations#index"
  # get "/educations/show/:id" => "educations#show"
  delete "/educations/destroy/:id" => "educations#destroy"

  post "/infos/create"  => "info#create"


  post "/cvs/create"  => "cv#create"


  post "/skills/create"  => "skills#create"
  put "/skills/update/:id" => "skills#update"
  get "/skills/index" => "skills#index"
  delete "/skills/destroy/:id" => "skills#destroy"








  namespace :api do
    scope :v1 do
      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'overrides/registrations'
       }    end
  end
  

end
