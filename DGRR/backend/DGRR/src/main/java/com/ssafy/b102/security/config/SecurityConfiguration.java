package com.ssafy.b102.security.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.context.SecurityContextPersistenceFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

//import com.ssafy.b102.filter.JwtFilter;
import com.ssafy.b102.persistence.dao.UserRepository;
import com.ssafy.b102.security.config.jwt.JwtAuthenticationFilter;
import com.ssafy.b102.security.config.jwt.JwtAuthorizationFilter;

import lombok.AllArgsConstructor;

@EnableWebSecurity
@AllArgsConstructor
//@RequiredArgsConstructor
@Configuration
public class SecurityConfiguration {

   private final UserDetailsService userDetailsService;
   @Autowired
   private UserRepository userRepository;
   
   @Autowired
   private CorsConfig corsConfig;
   
   @Bean
   public static BCryptPasswordEncoder bCryptPasswordEncoder() {
      return new BCryptPasswordEncoder();
   }

   @Bean
   public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
         throws Exception {
      return authenticationConfiguration.getAuthenticationManager();
   }

   private final AuthenticationConfiguration authenticationConfiguration;

   @Bean
   public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
      /* @formatter:off */
      http
//      .addFilter(corsConfig.corsFilter())
      .cors().configurationSource(corsConfigurationSource()).and()
      .csrf().disable()
         .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
         .and()
         .formLogin().disable()
         .httpBasic().disable()
         .authorizeRequests()
            .antMatchers("/api/v1/**").permitAll() // 설정한 리소스의 접근을 인증절차 없이 허용
            .anyRequest().permitAll() // 그 외 모든 리소스를 의미하며 인증 필요
         .and()
         .formLogin()
//            .permitAll()
//            .loginPage("/login") // 기본 로그인 페이지
//            .loginProcessingUrl("/login")
//            .defaultSuccessUrl("/hello")
//            .and()
            .disable()
            .addFilter(new JwtAuthenticationFilter(authenticationManager(authenticationConfiguration)))//전달해야 하는 필터 AuthencationManager
            .addFilter(new JwtAuthorizationFilter(authenticationManager(authenticationConfiguration), userRepository))
         .logout()
            .permitAll()
            // .logoutUrl("/logout") // 로그아웃 URL (기본 값 : /logout)
            // .logoutSuccessUrl("/login?logout") // 로그아웃 성공 URL (기본 값 : "/login?logout")
            .logoutRequestMatcher(new AntPathRequestMatcher("/logout")) // 주소창에 요청해도 포스트로 인식하여 로그아웃
            .deleteCookies("JSESSIONID") // 로그아웃 시 JSESSIONID 제거
            .invalidateHttpSession(true) // 로그아웃 시 세션 종료
            .clearAuthentication(true); // 로그아웃 시 권한 제거
         
      return http.build();
      /* @formatter:on */
   }
   @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("*");
        configuration.setAllowedMethods(Arrays.asList("GET","POST", "OPTIONS", "PUT","DELETE"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.addExposedHeader("*");
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
//   @Autowired
//   public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
//      auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder());
//   }
}