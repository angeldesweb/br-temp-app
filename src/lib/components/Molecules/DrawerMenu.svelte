<div class="drawer drawer-mobile">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col items-center justify-center">
        <!-- Page content here -->
        <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">filters</label>
        <slot name="content"></slot>
        
    </div> 
    <div class="drawer-side">
        <label for="my-drawer-2" class="drawer-overlay"></label> 
        <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
            <!-- Sidebar content here -->
            <slot name="side"></slot>
        </ul>
    </div>
</div>