Rails.application.routes.draw do
  #mount_devise_token_auth_for 'User', at: 'auth'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  default_url_options :host => "http://localhost:3000/"
  namespace :admin do
    %i(
      offers
      companies
      users
      categories
    ).each do |name|
    resources name, only: %i(index show new create edit update destroy)
    end
  end

  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?
  post "/company/create"  => "company#create"
  put "/company/update/:id" => "company#update"
  get "/company/index" => "company#index"
  get "/company/show/:id" => "company#show"
  delete "/company/destroy/:id" => "company#destroy"
  get "/company/userCompany" => "company#userCompany"
  put "/company/updateCompany" => "company#updateCompany"
  get "/company/company" => "company#companylast"




  delete "/users/destroy/:id" => "users#destroy"
  get "/users/show" => "users#show_user"
  put "/users/update/:id" => "users#update"
  get "/users/index" => "users#index"
  get "/users/indexlast" => "users#indexlast"
  get "/users/companies" => "users#companies"
  post "/users/upload/cv" => "users#upload_cv"




  post "/offers/create"  => "offer#create"
  put "/offers/update/:id" => "offer#update"
  get "/offers/index" => "offer#index"
  get "/offers/show/:id" => "offer#show"
  delete "/offers/destroy/:id" => "offer#destroy"
  get "/offers/offer" => "offer#offer"

  get "/offers/recent" => "offer#recent_offers"
  post "/offers/favorite/:id"  => "offer#add_remove_favorite"
  get "/offers/favorite/jobs"  => "offer#favorite_jobs"




  post "/educations/create"  => "educations#create"
  put "/educations/update/:id" => "educations#update"
  get "/educations/index" => "educations#index"
  delete "/educations/destroy/:id" => "educations#destroy"

  post "/hobbies/create"  => "hobbies#create"
  put "/hobbies/update/:id" => "hobbies#update"
  get "/hobbies/index" => "hobbies#index"
  delete "/hobbies/destroy/:id" => "hobbies#destroy"


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

  post "/test/validate/:id" => "test#validate"
  get "/test/show/:id" => "test#show"
  post "/test/addquestion/:id" => "test#add_question"
  delete "/test/destroy/:id" => "test#destroy"
  put "/test/updatequestion/:id" => "test#update_question"
  put "/test/updateanswer/:id" => "test#update_answer"
  get "/test/checktest/:id" => "test#check_test"
  post "/test/testresult/:test_id" => "test#test_result"
  
  
  post "/apply/candidatlist/:id" => "apply#candidat_list"
  get "/apply/acceptorrefuse/:id/:status" => "apply#accept_refuse"
  get "/apply/my/applies" => "apply#my_applies" 
  delete "/apply/delete/:id" => "apply#destroy" 


  get "/categories/index" => "categories#index"














  namespace :api do
    scope :v1 do
      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'overrides/registrations',
        omniauth_callbacks: "overrides/omniauth_callbacks" 
       }    end
  end
  

end
