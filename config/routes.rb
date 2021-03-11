Rails.application.routes.draw do
  #mount_devise_token_auth_for 'User', at: 'auth'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?
  post "/company/create"  => "company#create"
  put "/company/update/:id" => "company#update"
  get "/company/index" => "company#index"
  get "company/show/:id" => "company#show"
  delete "company/destroy/:id" => "company#destroy"
  namespace :api do
    scope :v1 do
      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'overrides/registrations'
       }    end
  end
  

end
