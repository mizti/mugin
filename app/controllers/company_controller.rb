class CompanyController < ApplicationController
  respond_to :json
  def index
  end

  def search
  end

  def show
    @company = {}
    if params!=nil then
      @company = Company.where(ticker: params[:ticker]).first
    end
    if @company == nil then
      render :file => "#{Rails.root}/public/404.html",  :status => 404
    end
  end

  def data
    @company = {}
    if params[:ticker] != nil and params[:year] != nil
      @company = Company.where(ticker: params[:ticker]).where(year: params[:year]).first
      if @company == nil then 
        render :nothing => true
      else
        render json:  @company #idとか余分な要素も返却されてるのを直す
      end
    end
  end

end
